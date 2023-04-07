// cspell:ignore Doortag
import React, {useMemo, useCallback, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Link from 'next/link'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import {
  Typography as Type,
  Box,
  FormControl,
  InputLabel,
  Select,
  Link as MuiLink,
  MenuItem,
  Divider,
  useTheme,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Spacing from '@components/boxes/Spacing'
import {ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import MainPhone from '@components/links/MainPhone'
import CollectionsPhone from '@components/links/CollectionsPhone'

type Languages =
  | 'english'
  | 'spanish'
  | 'chinese'
  | 'korean'
  | 'vietnamese'
  | 'tagalog'

const crossFadeDuration = 1000 * 0.3 // 300 milliseconds

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    trans: {
      '& .cross-fade-leave': {
        opacity: 1,
        transition: `opacity ${crossFadeDuration}ms linear`
      },
      '& .cross-fade-leave.cross-fade-leave-active': {
        opacity: 0
      },
      '& .cross-fade-enter': {
        opacity: 0,
        transition: `opacity ${crossFadeDuration}ms linear`
      },
      '& .cross-fade-enter.cross-fade-enter-active': {
        opacity: 1
      },
      '&.cross-fade-height': {
        transition: `height ${crossFadeDuration}ms ease-in-out`
      }
    }
  })
)

const ShutoffProtectionPage = () => {
  const theme = useTheme()
  const classes = useStyles()
  const [language, setLanguage] = useState<Languages>('english')

  const languageChangeHandler = useCallback(
    ({target}: React.ChangeEvent<{value: unknown}>) => {
      const {value} = target
      setLanguage(value as Languages)
    },
    []
  )

  const documents: {language: Languages; Component: JSX.Element}[] = useMemo(
    () => [
      {
        language: 'english',
        Component: (
          <Box key={0}>
            <article>
              <Type variant="h2" gutterBottom color="primary">
                Water Shutoff Policy
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Policy on Discontinuation of Residential Water Service for
                Nonpayment
              </Type>
              <Type paragraph>
                California law provides options for customers to avoid
                discontinuation of residential water service for nonpayment of
                their water bill. Those options include deferred payments or
                alternative payment schedules, and appealing a water bill.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                How Can I Get A Deferred or Alternate Payment Schedule?
              </Type>
              <Type paragraph>
                A customer who is unable to pay for water service within the
                normal payment period may request an alternative payment plan to
                avoid disruption of service. PCWA will consider all
                circumstances surrounding the request and make a determination
                as to whether the deferred or alternate payment arrangement is
                warranted. The payment plan can either defer the amount due to a
                later date or provide for a payment schedule for the outstanding
                balance. A plan will require the account to be brought up to
                date in 60 days but may not exceed 12 months from the original
                due date. To inquire about an alternate payment schedule, please
                call Customer Services at <CollectionsPhone />.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Specific Programs for Low-Income Customer Self Certification
              </Type>
              {/* <Type variant="h4" gutterBottom>
                Alternative Payment Arrangements
              </Type> */}
              <Type paragraph>
                Pursuant to Section 116900 of the Health and Safety Code, Placer
                County Water Agency (PCWA) will not terminate residential
                service for nonpayment when specific conditions are met.
              </Type>

              <Type paragraph>
                <strong>All three requirements</strong> must be met to avoid
                disruption of water service:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="A primary care provider certifies that discontinuation will be life-threatening or poses a serious threat to the health and safety of a resident on the premises where service is provided; and" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="A customer demonstrates he or she is financially unable to pay; and" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="A customer is willing to enter an amortization agreement, alternative payment schedule, or plan for a deferred or reduced payment." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                Reduced Reconnection Fees
              </Type>
              <Type paragraph>
                For residential customers who demonstrate to the Agency a
                household income below 200 percent of the federal poverty line,
                the Agency will reduce reconnection fees.
              </Type>

              <Type paragraph>
                To inquire about eligibility requirements please contact
                Customer Services at <CollectionsPhone /> or click the link to
                complete the{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    Water Shutoff Protection Self Certification Form
                  </MuiLink>
                </Link>{' '}
                online.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                How Can I Appeal My Water Bill?
              </Type>
              <Type paragraph>
                Customers may dispute bills, or request an adjustment of bills,
                within 60 days of the bill date. No penalties or charges accrue
                on a disputed bill until 10 working days after a response from
                the Agency.
              </Type>
              <Type paragraph>
                To have your bill reviewed by customer service staff, please
                contact our Customer Services department at <MainPhone />.
              </Type>
              <Type paragraph>
                If there is no satisfactory resolution by customer service
                staff, a customer can then have their bill reviewed by a
                supervisor or manager. If a customer is still dissatisfied with
                the outcome, the customer may request a review by the General
                Manager. The General Manager can correct any billing errors made
                by the Agency. If a resolution is not reached by the General
                Manager, a final review and decision will be made by the Agency
                Board of Directors.
              </Type>
              {/* <Type variant="h3" gutterBottom color="primary">
                Tenant Rights
              </Type>
              <Type paragraph>
                Under SB998, actual users of the service have the right to
                become customers of the Agency. Tenants must be willing to
                assume financial responsibility for subsequent charges as well
                as agree to the conditions for service including deposit. The
                tenant/occupant may be asked to provide verification of tenancy
                to verify the delinquent account holder was the landlord,
                property manager or other agent of the property.
              </Type> */}
            </article>
            <Spacing factor={2}>
              <Divider />
            </Spacing>
            <Type variant="h3">Documents</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>English</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/ca825860-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyENbc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/ca825860-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyENbc123019.pdf'
                }}
                caption="Water Shutoff Protection Act Policy"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/6057f9b0-6ced-11ec-af0e-17f5b6d183fb-Door-Tag-2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.pcwa.net/door-tag.pdf"
                  caption="Standard PCWA Doortag"
                  alt="Thumbnail and link for Door Tag Sample PDF"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/5b6ea6b0-6ced-11ec-af0e-17f5b6d183fb-Shut-Off-Notice-2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.pcwa.net/shut-off-notice.pdf"
                  caption="Written Notice"
                  alt="Thumbnail and link for service Written Shut-off Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      },
      // cspell:disable
      {
        language: 'spanish',
        Component: (
          <Box key={1}>
            <article>
              <Type variant="h2" gutterBottom color="primary">
                Política de Cierre de Agua
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Política de interrupción del servicio residencial de agua por
                falta de pago
              </Type>
              <Type paragraph>
                La ley de California ofrece opciones para que los clientes
                eviten la interrupción del servicio residencial de agua por
                falta de pago de su factura de agua. Estas opciones incluyen
                programas de pagos diferidos o pago alternativo, y apelar una
                factura de agua.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                ¿Cómo puedo obtener un programa de pago diferido o alternativo?
              </Type>
              <Type paragraph>
                Un cliente que no pueda pagar el servicio de agua dentro del
                período de pago normal puede solicitar un plan de pago
                alternativo para evitar la interrupción del servicio. La Agencia
                de agua del Condado de Placer (PCWA) considerará todas las
                circunstancias que rodean la solicitud y tomará una
                determinación sobre si se justifica el acuerdo de pago diferido
                o alternativo. El plan de pago puede aplazar el monto adeudado a
                una fecha posterior o establecer un calendario de pagos para el
                saldo pendiente. Un plan requerirá que la cuenta se actualice en
                60 días, pero no puede exceder los 12 meses a partir de la fecha
                de vencimiento original. Para averiguar sobre un calendario de
                pago alternativo, por favor llame a Servicio al Cliente{' '}
                <MainPhone />.
              </Type>

              <Type variant="h3" gutterBottom color="primary">
                Programas específicos para la autocertificación de cliente con
                ingresos bajos
              </Type>
              {/* <Type variant="h4" gutterBottom>
                Alternative Payment Arrangements
              </Type> */}
              <Type paragraph>
                De conformidad con la sección 116900 del Código de salud y
                seguridad, la Agencia de agua del condado Placer (PCWA) no
                cortará el servicio residencial por falta de pago cuando se
                cumplan determinadas condiciones específicas.
              </Type>

              <Type paragraph>
                Se deben cumplir <strong>los tres requisitos</strong> para
                evitar la interrupción del servicio de agua:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="un proveedor de atención primaria certifica que la interrupción representará una amenaza de vida o una amenaza grave a la salud y seguridad de un residente del sitio donde se brinda el servicio; y" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="el cliente demuestra que es financieramente no apto para pagar; y" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="el cliente tiene interés en participar en un acuerdo de amortización, programa de pago alternativo o plan para un pago diferido o reducido." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                Tarifas de reconexión reducidas
              </Type>
              <Type paragraph>
                En el caso de los clientes residenciales que demuestren a la
                Agencia que los ingresos percibidos en el hogar están por debajo
                del 200 por ciento de la línea federal de pobreza, la Agencia
                reducirá las tarifas de reconexión.
              </Type>
              <Type paragraph>
                Si tiene consultas sobre los requisitos de elegibilidad, entre
                en contacto con Atención al cliente en el teléfono{' '}
                <CollectionsPhone /> o haga clic en{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    el enlace para completar un Formulario de Autocertificación
                  </MuiLink>
                </Link>
                .
              </Type>

              <Type variant="h3" gutterBottom color="primary">
                ¿Cómo puedo apelar mi factura de agua?
              </Type>
              <Type paragraph>
                Los clientes pueden recurrir facturas, o solicitar un ajuste de
                facturas, dentro de los 60 días de la fecha de facturación. No
                se acumulan penalizaciones o cargos en una factura en disputa
                hasta 10 días hábiles después de una respuesta de la Agencia.
              </Type>
              <Type paragraph>
                Para que su factura sea revisada por el personal de servicio al
                cliente, póngase en contacto con nuestro departamento de
                Servicio al Cliente <MainPhone />.
              </Type>
              <Type paragraph>
                Si no hay una resolución satisfactoria por parte del personal de
                servicio al cliente, el cliente puede solicitar la revisión de
                la factura por parte de un supervisor o gerente. Si el cliente
                aún no está satisfecho con el resultado, puede solicitar una
                revisión por parte del Gerente General. El Gerente General puede
                corregir cualquier error de facturación cometido por la Agencia.
                Si el Gerente General no llega a una resolución, el Consejo de
                administración de la Agencia realizará una revisión y tomará una
                decisión definitiva.
              </Type>
            </article>
            <Spacing size="large" />
            <Type variant="h3">Documentos</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>Spanish</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/caaf82e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicySPbc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/caaf82e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicySPbc123019.pdf'
                }}
                caption="Política de la Ley de Protección de Cierre de Agua"
                alt="Miniatura y enlace para PDF de la Política de la Ley de Protección contra el Cierre del Agua"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6a40990-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-ESbc010422.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6a40990-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-ESbc010422.pdf"
                  caption="Etiqueta de Puerta PCWA Estándar"
                  alt="Miniatura y enlace para el PDF de muestra de etiqueta de puerta"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6cc5210-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-ESbc011022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6cc5210-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-ESbc011022.pdf"
                  caption="Noticia Escrita"
                  alt="Thumbnail and link for service Written Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      },
      {
        language: 'korean',
        Component: (
          <Box key={2}>
            <article>
              <Type variant="h3" gutterBottom color="primary">
                물 차단 정책
              </Type>
              <Type variant="subtitle1" gutterBottom>
                수도 요금 미납자에 대한 주거용 수도 공급 중단 정책
              </Type>
              <Type paragraph>
                캘리포니아 법에 따라 수도세 미납자에 대한 주거용 수도 공급
                중단에 대비한 방안이 마련되어 있습니다. 이는 납부 기한 연장을
                요청하거나 납부 일정을 변경, 수도 요금 재검토를 요청하는 경우를
                포함합니다.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                납부 기한 연장 또는 납부 일정 변경은 어떻게 요청할 수 있습니까?
              </Type>
              <Type paragraph>
                수도 요금을 일반 납부 기한 안에 납부할 수 없는 경우, 수도 공급
                중단을 피하려면 납부 일정 변경을 요청할 수 있습니다. PCWA는
                요청한 건에 대한 모든 상황을 고려하여 기간 연장 또는 납부 일정
                변경이 타당한지 결정할 것입니다. 납부 일정을 원래 기한 보다
                늦추거나미납요금에대한납부일정을정할수도있습니다.
                기한연장일정은최대 60일 이내로 정할 수 있으며 원래 기한으로부터
                12개월을 초과할 수 없습니다. 납부 일정 변경을 요청하려면 고객
                지원 부서로 문의하시기 바랍니다 <CollectionsPhone />.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                저소득 고객의 자가 인증을 위한 특정 프로그램
              </Type>
              {/* <Type variant="h4" gutterBottom>
                Alternative Payment Arrangements
              </Type> */}
              <Type paragraph>
                의료 및 안전 규정 제 116900 항에 따라, 플레이서 카운티
                수도국(Placer County Water Agency, PCWA)은 특정 조건에 부합하는
                경우 미납으로 인한 거주자 서비스를 종료하지 않을 것입니다.
              </Type>

              <Type paragraph>
                <strong>세 가지 요건이 전부</strong> 충족되어야만 수도 서비스
                장애를 피할 수 있으며, 그 요건은 다음과 같습니다:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="서비스의 중단이 서비스 제공 부지 거주자의 생명을 위협하거나 건강과 안전에 심각한 위협을 초래한다는 것을 1 차 의료기관이 확인하는 경우," />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="고객이 스스로 재정적 지불능력이 없음을 입증하는 경우," />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="고객이 할부 상환 계약을 체결할 의지가 있거나, 대체 납부 일정이나 연불 혹은 감액 지불 계획에 착수할 의지가 있는 경우." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                재연결 요금의 감액
              </Type>
              <Type paragraph>
                거주자이면서 가계 소득이 연방 자산 경계선의 200 퍼센트 미만임을
                수도국에 입증하는 고객에 대해, 수도국은 재연결 요금을 감액해줄
                것입니다.
              </Type>

              <Type paragraph>
                자격 요건에 관한 문의사항은 로 전화하여 고객 서비스에{' '}
                <CollectionsPhone />, 또는{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    링크를 클릭하여 자가 인증 양식을 작성하십시오
                  </MuiLink>
                </Link>
                .
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                수도 요금 재검토는 어떻게 요청할 수 있습니까?
              </Type>
              <Type paragraph>
                수도 요금 고지서 날짜로부터 60 일 이내에 요금에 대한 이의를
                제기하거나 정정 요청을 할 수 있습니다. 기관의 응답 후 업무일
                기준으로 10 일 이내에는 이의가 제기된 고지서에 대해 벌금 또는
                추가 금액이 청구되지 않습니다.
              </Type>
              <Type paragraph>
                고객 지원 부서의 고지서 검토를 원하시는 경우, 고객 지원 부서로
                문의하여 주십시오 <MainPhone />.
              </Type>
              <Type paragraph>
                고객 지원 부서 직원이 만족스러운 해결 방안을 찾지 못했다면,
                부서장 또는 관리자에게 고지서 검토를 요청할 수 있습니다.
                계속하여 결과를 납득할 수 없는 경우, 총책임자에게 검토를 요청할
                수 있습니다. 총책임자는 기관 측 과실로 인한 모든 청구 오류를
                수정할 수 있습니다. 총책임자도 해결하지 못한 경우에는 기관
                이사회에서 최종 검토 및 결정을 내릴 것입니다.
              </Type>
            </article>
            <Spacing size="large" />
            <Type variant="h3">서류</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>Korean</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/ca8cdfb0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyKObc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/ca8cdfb0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyKObc123019.pdf'
                }}
                caption="물 차단 보호법 정책"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6c462d0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-KObc010422.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6c462d0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-KObc010422.pdf"
                  caption="표준 PCWA 도어 태그"
                  alt="Thumbnail and link for Door Tag Sample PDF"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6caa460-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-KObc011022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6caa460-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-KObc011022.pdf"
                  caption="서면 통지"
                  alt="Thumbnail and link for service Written Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      },
      {
        language: 'chinese',
        Component: (
          <Box key={3}>
            <article>
              <Type variant="h2" gutterBottom color="primary">
                停水政策
              </Type>
              <Type variant="subtitle1" gutterBottom>
                逾時未付款之住宅供水服務中斷政策
              </Type>
              <Type paragraph>
                加州法律規定選項讓客戶得以避免因未繳水費帳單而住宅供水服務遭到中斷。那些選項包
                括付款遞延或替代的付款日程，及水費帳單上訴動作.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                我如何取得遞延或替代的付款日程?
              </Type>
              <Type paragraph>
                無法在正常付款期限內支付水費的客戶可要求替代式付款計畫，以避免服務遭到中斷.
                PCWA
                將考量要求相關所有情況，並判定遞延或替代的付款安排是否獲得保證。付款計畫
                會因為日期延後而將金額隨之遞延，或針對待付餘額提供付款日程。計畫會要求帳戶帶入
                60日期限，但不得超過原始到期日起的12個月。若要詢問替代的付款日程，請逕洽客戶服
                務部門 <CollectionsPhone />.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                低收入客戶自行核證的特定計劃
              </Type>
              <Type paragraph>
                根據《健康與安全法》第 116900 條，符合特定條件時，普萊瑟縣水務署
                (PCWA) 不會因 欠費而終止住宿服務.
              </Type>

              <Type paragraph>
                <strong>全部三個要求</strong>{' '}
                均須得以滿足，方能避免供水服務遭中斷:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="基層醫療服務提供商核證，中斷服務會危及生命，或對居住在提供有關服務的場所 內居民的健康與安全構成嚴重威脅;及" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="客戶證明自己無經濟能力來繳費;及" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="客戶願意訂立分期繳費協議、替代性繳費安排或遞延或減少繳費計劃." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                寬減恢復供水費
              </Type>
              <Type paragraph>
                如住宅客戶向本署證明，其住戶收入低於聯邦貧窮線的
                200%，本署會寬減恢復供水費.
              </Type>

              <Type paragraph>
                如欲查詢資格要求，請聯絡客戶服務部，電話為 <CollectionsPhone />{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    或按一下連結，以填寫 自行核證表
                  </MuiLink>
                </Link>
                .
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                我如何針對自己的水費帳單進行上訴?
              </Type>
              <Type paragraph>
                客戶們可在帳單日期後 60
                日內對帳單提出爭議，或要求帳單調整。受理單位回應後10個
                工作日才會對爭議帳單累加罰鍰或收費.
              </Type>
              <Type paragraph>
                若要讓您的帳單交付客戶服務人員審查，請連絡我們的客戶服務部門{' '}
                <MainPhone />.
              </Type>
              <Type paragraph>
                如果對客戶服務人員的解決方案感到不滿意，客戶接著可將自己的帳單交由主管或經理審
                查. 如果客戶仍對結果不滿意，客戶可要求總經理審查.
                總經理可對受理單位造成的任何
                帳單錯誤進行改正動作。如果總經理無法擬出解決方案，會由受理單位的董事會進行最終
                審查並作出決定.
              </Type>
            </article>
            <Spacing size="large" />
            <Type variant="h3">文件资料</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>Chinese</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/ca8b0af0-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyCHbc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/ca8b0af0-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyCHbc123019.pdf'
                }}
                caption="断水保护法政策"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e69bcc30-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-CHbc010422.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e69bcc30-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-CHbc010422.pdf"
                  caption="标准PCWA门牌"
                  alt="Thumbnail and link for Door Tag Sample PDF"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6a47ec0-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-CHbc011022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6a47ec0-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-CHbc011022.pdf"
                  caption="終止通知"
                  alt="Thumbnail and link for service Written Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      },
      {
        language: 'vietnamese',
        Component: (
          <Box key={4}>
            <article>
              <Type variant="h3" gutterBottom color="primary">
                Chính sách tắt nước
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Chính sách ngừng cung cấp dịch vụ nước sinh hoạt do không thanh
                toán
              </Type>
              <Type paragraph>
                Luật pháp California cung cấp cho khách hàng các lựa chọn để
                tránh bị ngừng cung cấp dịch vụ nước sinh hoạt do không thanh
                toán hóa đơn tiền nước. Những lựa chọn đó bao gồm các khoản
                thanh toán trả chậm hoặc lịch thanh toán thay thế và khiếu nại
                về hóa đơn tiền nước.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Luật pháp California cung cấp cho khách hàng các lựa chọn để
                tránh bị ngừng cung cấp dịch vụ nước sinh hoạt do không thanh
                toán hóa đơn tiền nước. Những lựa chọn đó bao gồm các khoản
                thanh toán trả chậm hoặc lịch thanh toán thay thế và khiếu nại
                về hóa đơn tiền nước.
              </Type>
              <Type paragraph>
                Khách hàng không thể thanh toán dịch vụ nước trong thời hạn
                thanh toán thông thường có thể yêu cầu một kế hoạch thanh toán
                thay thế để tránh bị ngừng cung cấp dịch vụ. PCWA sẽ xem xét tất
                cả các trường hợp liên quan đến yêu cầu này và đưa ra quyết định
                về việc có đảm bảo bố trí thanh toán trả chậm hoặc thay thế hay
                không. Kế hoạch thanh toán có thể là trả chậm số tiền đến hạn
                thanh toán vào ngày muộn hơn hoặc cung cấp lịch thanh toán cho
                số tiền nợ. Kế hoạch thanh toán có thể trả chậm một khoản tiền
                lên đến 60 ngày, nhưng không được quá 12 tháng kể từ ngày đến
                hạn ban đầu. Để yêu cầu lịch thanh toán thay thế, vui lòng gọi
                điện cho Phòng dịch vụ khách hàng theo số <CollectionsPhone />.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Các Chương Trình Cụ Thể cho Tự Chứng Nhận Khách Hàng Có Thu Nhập
                Thấp
              </Type>

              <Type paragraph>
                Theo Mục 116900 của Luật Sức Khỏe và An Toàn, Cơ Quan Cấp Nước
                Quận Placer (PCWA) sẽ không chấm dứt dịch vụ sinh hoạt vì không
                thanh toán khi quý vị đáp ứng các điều kiện cụ thể.
              </Type>

              <Type paragraph>
                <strong>Tất cả các yêu cầu này</strong> phải được đáp ứng để
                tránh bị gián đoạn dịch vụ cấp nước:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nhà cung cấp dịch vụ chăm sóc chính chứng nhận rằng việc ngừng cung cấp dịch vụ sẽ đe dọa đến tính mạng hoặc gây ra mối đe dọa nghiêm trọng đến sức khỏe và sự an toàn của cư dân tại khu nhà được cung cấp dịch vụ; và" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Khách hàng chứng minh được rằng họ không có khả năng tài chính để thanh toán; và" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Khách hàng sẵn sàng ký một thỏa thuận khấu hao, lịch thanh toán thay thế hoặc lập kế hoạch trả chậm hoặc giảm giá." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                Giảm Phí Cấp Lại
              </Type>
              <Type paragraph>
                Đối với những khách hàng sử dụng dịch vụ sinh hoạt chứng minh
                được với Cơ quan rằng thu nhập hộ gia đình dưới 200% mức chuẩn
                nghèo liên bang, Cơ quan sẽ giảm phí cấp lại.
              </Type>

              <Type paragraph>
                Để hỏi về các yêu cầu đủ điều kiện, vui lòng liên hệ Dịch Vụ
                Khách Hàng theo số <CollectionsPhone />{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    hoặc nhấp vào liên kết để hoàn thành Mẫu Tự Chứng Nhận
                  </MuiLink>
                </Link>
                .
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Tôi có thể khiếu nại về hóa đơn tiền nước của mình bằng cách
                nào?
              </Type>
              <Type paragraph>
                Khách hàng có thể không đồng ý với hóa đơn hoặc yêu cầu điều
                chỉnh hóa đơn, trong vòng 60 ngày kể từ ngày lập hóa đơn. Không
                phát sinh bất kỳ khoản phạt hoặc khoản phí nào trong vòng 10
                ngày làm việc khi có phản hồi từ Cơ quan.
              </Type>
              <Type paragraph>
                Để yêu cầu nhân viên dịch vụ khách hàng xem xét lại hóa đơn của
                bạn, vui lòng liên hệ với Phòng dịch vụ khách hàng tại{' '}
                <MainPhone />.
              </Type>
              <Type paragraph>
                Nếu nhân viên dịch vụ khách hàng không có giải pháp thỏa đáng,
                khi đó khách hàng có thể yêu cầu một người giám sát hoặc quản lý
                xem xét lại hóa đơn. Nếu vẫn không hài lòng với kết quả, khách
                hàng có thể yêu cầu Tổng Giám đốc xem xét lại. Tổng Giám đốc có
                thể sửa bất kỳ lỗi lập hóa đơn nào do Cơ quan gây ra. Nếu Tổng
                Giám đốc không thể đưa ra biện pháp giải quyết, đánh giá và
                quyết định cuối cùng sẽ do Hội đồng Quản trị Cơ quan đưa ra.
              </Type>
            </article>
            <Spacing size="large" />
            <Type variant="h3">Các tài liệu</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>Vietnamese</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/cabe28e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyVIbc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/cabe28e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyVIbc123019.pdf'
                }}
                caption="Chính sách Đạo luật Bảo vệ Tắt nước"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6a939b0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-VNbc010422.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6a939b0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-VNbc010422.pdf"
                  caption="Thẻ cửa PCWA tiêu chuẩn"
                  alt="Thumbnail and link for Door Tag Sample PDF"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6cdffc0-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-VNbc011022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6cdffc0-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-VNbc011022.pdf"
                  caption="Thông Báo Viết"
                  alt="Thumbnail and link for service Written Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      },
      {
        language: 'tagalog',
        Component: (
          <Box key={5}>
            <article>
              <Type variant="h3" gutterBottom color="primary">
                Patayin ang Patakaran sa tubig
              </Type>
              <Type variant="subtitle1" gutterBottom>
                Patakaran sa Paghihinto ng Residensyal na Serbisyong Patubig
                dahil sa Hindi Pagbabayad
              </Type>
              <Type paragraph>
                Ang batas ng California ay nagbibigay ng mga opsyon para
                maiwasan ang pagkakahinto ng residenyal na serbisyong patubig
                dahil sa hindi pagbabayad ng kanilang water bill. Kabilang sa
                mga opsyong ito ang mga ipinagpapalibang pagbabayad o mga
                alternatibong iskedyul ng pagbabayad, at pag-aapela sa isang
                water bill.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Paano Ako Makakakuha ng Ipinagpalibang Pagbabayad o
                Alternatibong Iskedyul sa Pagbabayad?
              </Type>
              <Type paragraph>
                Ang isang customer na hindi makapagbayad para sa serbisyong
                patubig sa loob ng karaniwang panahon ng pagbabayad ay maaaring
                humiling ng alternatibong plano sa pagbabayad upang iwasan ang
                pagkaantala ng serbisyo. Isasaalang-alang ng PCWA ang lahat ng
                kalagayang pumapalibot sa kahilingan at pagpapasyahan nito kung
                kinakailangan ang ipinagpaliban o alternatibong kaayusan ng
                pagbabayad. Maaaring ipagpaliban ng plano sa pagbabayad ang
                halagang dapat bayaran sa mas malayong petsa o magbigay ng
                iskedyul ng pagbabayad para sa natitirang balanse. I-aatas ng
                plano na bayaran ang balanse ng account sa loob ng 60 araw,
                ngunit hindi maaaring lumampas ng 12 buwan mula sa orihinal na
                petsa na dapat itong bayaran. Upang magtanong tungkol sa
                alternatibong iskedyul ng pagbabayad, pakitawagan ang Mga
                Serbisyong Pang-customer sa <CollectionsPhone />.
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Espisipikong Mga Programa para sa Sariling Sertipikasyon ng
                Mababang-Kita na Kostumer
              </Type>
              {/* <Type variant="h4" gutterBottom>
                Alternative Payment Arrangements
              </Type> */}
              <Type paragraph>
                Alinsunod sa Seksyon 116900 ng Kodigo sa Kalusugan at
                Kaligtasan, hindi bigyan ng katapusan ng Placer County Water
                Agency (PCWA) ang serbisyo sa pambahayan dahil sa hindi pagbayad
                kapag ang tiyak na mga kalagayan ay matugunan.
              </Type>

              <Type paragraph>
                <strong>Lahat ng tatlong mga kinakailangan</strong> ay dapat
                matugunan upang maiiwasan ang pagkaputol ng serbisyo sa tubig:
              </Type>
              <List dense disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Patunayan ng pangunahing tagapagbigay ng pangangalaga na ang hindi pagpapatuloy ay maging banta sa buhay o magdudulot ng malubhang banta sa kalusugan at kaligtasan ng isang residente sa mga lugar na kung saan ang serbisyo ay ibinigay; at" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ang isang kostumer ay magpapakita na siya ay walang kakayahang magbayad ng pinansyal; at" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BulletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ang kostumer ay pumapayag na papasok sa kasunduang amortisasyon, alternatibong iskedyul ng bayaran, o isang plano ng ipinagpaliban o binawasang pagbabayad." />
                </ListItem>
              </List>
              <Type variant="h4" gutterBottom>
                Binawasan na Mga Bayarin ng Muling Pagkonekta
              </Type>
              <Type paragraph>
                Para sa pambahayang mga kostumer na nagpapakita sa Ahensya ng
                kinita ng sambahayan na mababa sa 200 porsiyento sa linya ng
                kahirapang federal, babawasan ng Ahensya ang mga bayarin ng
                muling pagkokonekta.
              </Type>

              <Type paragraph>
                Upang magtanong tungkol sa mga kinakailangan sa pagiging
                karapat-dapat, mangyaring tawagan ang Mga Serbisyo sa Kostumer
                sa <CollectionsPhone /> o i-click ang link{' '}
                <Link
                  passHref
                  href="/forms/account/sb998-self-certification"
                  legacyBehavior
                >
                  <MuiLink variant="inherit" underline="hover">
                    upang kumpletuhin ang Form ng Sariling Sertipikasyon
                  </MuiLink>
                </Link>
                .
              </Type>
              <Type variant="h3" gutterBottom color="primary">
                Paano Ko I-aapela Ang Aking Water Bill?
              </Type>
              <Type paragraph>
                Maaaring ireklamo ng mga customer ang kanilang mga bill, o
                humiling ng pag-a-adjust ng mga bill, sa loob ng 60 araw mula sa
                petsa ng bill. Walang multa o singil na maiipon sa inireklamong
                bill hanggang 10 araw ng trabaho matapos ang sagot mula sa
                Ahensiya.
              </Type>
              <Type paragraph>
                Upang masuri ng mga kawani ng customer service ang iyong bill,
                pakikontak ang aming departamento ng Mga Serbisyong
                Pang-customer sa <MainPhone />.
              </Type>
              <Type paragraph>
                Kapag walang kasiya-siyang resolusyon mula sa kawani ng
                serbisyong pang-customer, maaaring ipasuri ng customer ang
                kanilang bill sa isang supervisor o manager. Kapag hindi
                nasiyahan ang isang customer sa resulta, maaaring humiling ang
                customer ng pagsusuri ng Pangkalahatang Manager. Maaaring itama
                ng Pangkalahatang Manager ang anumang mga pagkakamali sa billing
                na nagawa ng Ahensiya. Kapag walang resolusyong narating ang
                Pangkalahatang Manager, gagawa ng pinal na pagsusuri at desisyon
                ang Lupon ng Mga Direktor ng Ahensiya.
              </Type>
            </article>
            <Spacing size="large" />
            <Type variant="h3">Mga dokumento</Type>
            {/* <Type variant="subtitle1" color="textSecondary">
            <em>Tagalog / Filipino</em>
          </Type> */}
            <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
              <RowBox justifyContent="space-around">
                {/* <ImageThumbLink
                imgixUrl="https://imgix.cosmicjs.com/cabacd80-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyTAbc123019.pdf"

                  target= '_blank'
                  rel= 'noopener noreferrer'
                  href=
                    'https://cdn.cosmicjs.com/cabacd80-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyTAbc123019.pdf'
                }}
                caption="Patakaran sa Proteksyon ng Sarhan ng tubig"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              /> */}
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6a987d0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-TAbc010422.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6a987d0-78b0-11ec-bc8e-0b22aad4e2bd-Doortag-TAbc010422.pdf"
                  caption="Pamantayan PCWA Tag ng Door"
                  alt="Thumbnail and link for Door Tag Sample PDF"
                />
                <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/e6cd6380-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-TAbc011022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/e6cd6380-78b0-11ec-bc8e-0b22aad4e2bd-CUTOFF-notice-TAbc011022.pdf"
                  caption="Nakasulat Na Paunawa"
                  alt="Thumbnail and link for service Written Notice PDF"
                />
                {/* <ImageThumbLink
                  imgixUrl="https://imgix.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/2f2279b0-5e4e-11ea-aae7-630f03f2aad6-WSPA-Certification030420.pdf"
                  caption="Certification Form"
                  alt="Thumbnail and link for Certification Form PDF"
                /> */}
              </RowBox>
            </Box>
          </Box>
        )
      }
    ],
    [theme]
  )

  const selectedDocuments = useMemo(
    () => documents.filter((d) => d.language === language).shift(),
    [language, documents]
  )

  return (
    <PageLayout title="Customer Shutoff Protection" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Disconnection of Residential Water Service for Nonpayment Policy"
            subtitle="Services"
          />
          {/* <Type variant="h2" gutterBottom color="secondary">
            The Page is Currently Under Development
          </Type> */}
          <Spacing />

          {/* <Box bgcolor={blueGrey[50]} paddingY={2} paddingX={4}>
            <Type paragraph>
              In Response to Senate Bill 998, passed into law September 28,
              2018, Placer County Water Agency has modified its current Rules &
              Regulations to comply with this new law.
            </Type>
          </Box> */}

          {/* <Type paragraph>
            Check back here for further updates and information on our Water
            Shutoff Policy. This policy will be finalized and effective by Feb.
            1, 2020.
          </Type> */}
          {/* <Spacing size="x-large">
            <Divider />
          </Spacing> */}

          <FormControl variant="standard" className={classes.formControl}>
            <InputLabel id="language-select-label">
              Select your Language
            </InputLabel>
            <Select
              variant="standard"
              labelId="language-select-label"
              id="language-select"
              value={language}
              onChange={languageChangeHandler}
            >
              <MenuItem value={'english'}>English</MenuItem>
              <MenuItem value={'spanish'}>Español</MenuItem>
              <MenuItem value={'chinese'}>中文</MenuItem>
              <MenuItem value={'vietnamese'}>Tiếng Việt</MenuItem>
              <MenuItem value={'korean'}>한국어</MenuItem>
              <MenuItem value={'tagalog'}>Tagalog</MenuItem>
            </Select>
          </FormControl>

          <Spacing size="x-large" />

          <ReactCSSTransitionReplace
            className={classes.trans}
            transitionName="cross-fade"
            transitionEnterTimeout={crossFadeDuration}
            transitionLeaveTimeout={crossFadeDuration}
          >
            <Box key={selectedDocuments?.language}>
              {selectedDocuments?.Component}
            </Box>
          </ReactCSSTransitionReplace>

          <Spacing factor={2} />
          <Type variant="h3">Treated Water Shutoffs</Type>
          <Spacing />
          <RowBox justifyContent="space-around">
            <ColumnBox child alignItems="center" flexSpacing={1}>
              <ChildBox mb={-1}>
                <Type variant="h4">2020</Type>
              </ChildBox>
              <ChildBox width="100%">
                <Divider />
              </ChildBox>
              <ChildBox>
                <Type variant="subtitle1">
                  <strong>47</strong>
                </Type>
              </ChildBox>
            </ColumnBox>
            <ColumnBox child alignItems="center" flexSpacing={1}>
              <ChildBox mb={-1}>
                <Type variant="h4">2021</Type>
              </ChildBox>
              <ChildBox width="100%">
                <Divider />
              </ChildBox>
              <ChildBox>
                <Type variant="subtitle1">
                  <strong>0</strong>
                </Type>
              </ChildBox>
            </ColumnBox>
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ShutoffProtectionPage
